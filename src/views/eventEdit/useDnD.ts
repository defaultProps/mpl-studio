import { ref, watch } from 'vue'
import { newId } from '@mpl/libs'
import dagre from '@dagrejs/dagre'
import { Edge, Node, Position, useVueFlow } from '@vue-flow/core'
/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 * @type {{draggedType: Ref<string|null>, isDragOver: Ref<boolean>, isDragging: Ref<boolean>}}
 */
const state = {
	/**
	 * The type of the node being dragged.
	 */
	draggedType: ref(''),
	isDragOver: ref(false),
	isDragging: ref(false)
}

function useDragAndDrop() {
	const { draggedType, isDragOver, isDragging } = state

	const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

	watch(isDragging, dragging => {
		document.body.style.userSelect = dragging ? 'none' : ''
	})

	function onDragStart(event: any, type: any) {
		if (event.dataTransfer) {
			event.dataTransfer.setData('flowType', type)
			event.dataTransfer.effectAllowed = 'move'
		}

		draggedType.value = type
		isDragging.value = true

		document.addEventListener('drop', onDragEnd)
	}

	/**
	 * Handles the drag over event.
	 *
	 * @param {DragEvent} event
	 */
	function onDragOver(event: any) {
		event.preventDefault()

		if (draggedType.value) {
			isDragOver.value = true

			if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
		}
	}

	function onDragLeave() {
		isDragOver.value = false
	}

	function onDragEnd() {
		isDragging.value = false
		isDragOver.value = false
		draggedType.value = ''
		document.removeEventListener('drop', onDragEnd)
	}

	function isValidDropNode(event: any) {
		return event.dataTransfer?.getData("flowType") === draggedType.value ? draggedType.value : false
	}

	/**
	 * Handles the drop event.
	 *
	 * @param {DragEvent} event
	 */
	function onDrop(event: any, id?: string) {
		if (!isValidDropNode(event)) {
			console.warn('无效拖拽节点')
			return
		}

		const position = screenToFlowCoordinate({
			x: event.clientX,
			y: event.clientY
		})

		const newNode = {
			id: newId(),
			type: draggedType.value,
			position
		}

		/**
		 * Align node position after drop, so it's centered to the mouse
		 * you can hook into events even in a callback, and we can remove the event listener after it's been called.
		 */
		const { off } = onNodesInitialized(() => {
			updateNode(newNode.id, node => ({
				position: { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 }
			}))

			off()
		})

		// add edge
		if (id) {
			console.log(id)
		}

		addNodes(newNode)
	}

	return {
		draggedType,
		isDragOver,
		isDragging,
		onDragStart,
		onDragLeave,
		onDragOver,
		onDrop,
		isValidDropNode
	}
}

/**
 * Composable to run the layout algorithm on the graph.
 * It uses the `dagre` library to calculate the layout of the nodes and edges.
 */
export function useLayout() {
	const { findNode } = useVueFlow()

	const graph = ref(new dagre.graphlib.Graph())

	const previousDirection = ref('LR')

	function layout(nodes: Node[], edges: Edge[], direction: string) {
		// we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
		const dagreGraph = new dagre.graphlib.Graph()

		graph.value = dagreGraph

		dagreGraph.setDefaultEdgeLabel(() => ({}))

		const isHorizontal = direction === 'LR'
		dagreGraph.setGraph({ rankdir: direction })

		previousDirection.value = direction

		for (const node of nodes) {
			// if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)
			const graphNode = findNode(node.id)

			if (graphNode) {
				dagreGraph.setNode(node.id, { width: graphNode.dimensions.width || 150, height: graphNode.dimensions.height || 50 })
			}
		}

		for (const edge of edges) {
			dagreGraph.setEdge(edge.source, edge.target)
		}

		dagre.layout(dagreGraph)

		// set nodes with updated positions
		return nodes.map((node) => {
			const nodeWithPosition = dagreGraph.node(node.id)

			return {
				...node,
				targetPosition: isHorizontal ? Position.Left : Position.Top,
				sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
				position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
			}
		})
	}

	return { graph, layout, previousDirection }
}


export default useDragAndDrop