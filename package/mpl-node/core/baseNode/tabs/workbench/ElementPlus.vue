<script lang="ts" setup>
import { Tabs } from '../define'
import { inject, ref } from 'vue'
import RenderNodeList from '../../../../components/RenderNodeList.vue'
import { DRAG_START_NODE } from '../../../../libs'
import type { Fn, Fn1 } from '@mpl/typings'
import { Calendar } from '@element-plus/icons-vue'

const nodeClick = inject('nodeClick') as any
const dragover = inject<Fn1>('dragover', () => { })
const props = defineProps<{ node: Tabs }>()
const activeNames = ref<string>('vdr6u7')
const isDragoverBox = ref<boolean>(false)
const dragStartNode = inject(DRAG_START_NODE, ref(null))
const dropNodeCollapsePlus = inject<Fn>('dropNodeCollapsePlus', () => { })

function drop(cid: string, paneId: string) {
	isDragoverBox.value = false
	dropNodeCollapsePlus(cid, paneId)
}

const dragoverBaseBox = (el: DragEvent) => {
	if (!isDragoverBox.value && dragStartNode.value) {
		isDragoverBox.value = true
		dragover(el) 
	}
}

function dragleave() {
	isDragoverBox.value = false
}
</script>

<template>
	<div class="mpl-tabs" @click.stop="nodeClick(props.node.cid)">
		<el-tabs v-model="activeNames" type="border-card">
			<el-tab-pane v-for="pane in props.node.itemList" :key="pane.value" :name="pane.value">
				<template #label>
					<span class="mpl-tabs-label">
						<el-icon>
							<Calendar />
						</el-icon>
						<span>{{ pane.label }}</span>
					</span>
				</template>
				<div v-if="pane.mpl_children.length === 0 && !dragStartNode" class="mpl-empty-pane">
					请拖入控件或&nbsp;
					<button class="mpl-empty-pane-btn" type="button">
						选择模板
					</button>
				</div>
				<!-- <div v-else class="drag-pane-container" :class="{ dragover: isDragoverBox }" @dragleave.prevent="dragleave"
					@drop.stop.prevent="drop(props.node.cid, pane.value)" @dragover.stop.prevent="dragoverBaseBox">
					<RenderNodeList :node-list="pane.mpl_children" ui="elementPlus" />
				</div> -->
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<style lang="less">
.mpl-tabs {
	overflow: hidden;
	width: 100%;
	height: 100%;

	.el-tabs {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.el-tab-pane {
			width: 100%;

			.drag-pane-container {
				width: 100%;
				height: 100%;
				overflow: hidden;
				box-sizing: border-box;
				min-height: 200px;
				text-align: left;
			}

			.mpl-empty-pane {
				font-size: 12px;
				-webkit-user-drag: none;
				user-select: none;
				height: 200px;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #666;

				.mpl-empty-pane-btn {
					font-size: 12px;
					padding: 0 4px;
				}
			}
		}
	}
}
</style>
