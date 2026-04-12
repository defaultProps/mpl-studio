<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { computed } from 'vue'
import { StringFlowNode } from './init'
import DialogVisibleNode from './DialogVisibleNode.vue'
import SetVModelNode from './SetVModelNode.vue'
import ServiceNode from './ServiceNode.vue'
import ValidateNode from './ValidateNode.vue'
import ResetFormNode from './ResetFormNode.vue'
import VisibleNode from './VisibleNode.vue'
import FormNodeSetVModel from './FormNodeSetVModel.vue'
import ClearNodeData from './ClearNodeData.vue'
import DisabledNode from './DisabledNode.vue'
import MessageBox from './MessageBox.vue'
import ValidateDialog from './ValidateDialog.vue'
import CustomServiceNode from './CustomServiceNode.vue'
import PlatformServiceNode from './PlatformServiceNode.vue'
import ThirdServiceNode from './ThirdServiceNode.vue'
import ExecuteBlockNode from './ExecuteBlockNode.vue'
import ValidateFormItemNode from './ValidateFormItemNode.vue'
import ClearValidate from './ClearValidate.vue'
import UpdateFormNodeOptions from './UpdateFormNodeOptions.vue'

const props = defineProps<{ modelValue: StringFlowNode[] }>()
const emits = defineEmits(['update:modelValue'])
const list = computed({
	get: () => props.modelValue,
	set: value => emits('update:modelValue', value)
})
</script>
<template>
	<VueDraggable v-if="list.length" v-model="list" class="drag-area" scroll tag="div" :animation="300"
		handle=".flow-node-handle" group="flowNode">
		<template v-for="el in modelValue">
			<!-- 弹窗 -->
			<DialogVisibleNode v-if="el.type === 'dialogVisible'" :value="el" />

			<!-- 设置表单值 -->
			<SetVModelNode v-if="el.type === 'setVModel'" :value="el" />

			<!-- 请求服务 -->
			<ServiceNode v-if="el.type === 'service'" :value="el" />

			<!-- 组件校验 -->
			<ValidateNode v-if="el.type === 'validate'" :value="el" />

			<!-- 清除表单校验 -->
			<ValidateFormItemNode v-if="el.type === 'validateFormItem'" :value="el" />

			<!-- 清除组件校验 -->
			<ClearValidate v-if="el.type === 'clearValidate'" :value="el" />

			<!-- 重置表单 -->
			<ResetFormNode v-if="el.type === 'resetForm'" :value="el" />

			<!-- 显示节点 -->
			<VisibleNode v-if="el.type === 'visibleNode'" :value="el" />

			<!-- 组件赋值 -->
			<FormNodeSetVModel v-if="el.type === 'formNodeSetVModel'" :value="el" />

			<!-- 控件数据清空 -->
			<ClearNodeData v-if="el.type === 'clearFormItem'" :value="el" />

			<!-- 控件禁用 -->
			<DisabledNode v-if="el.type === 'disabledNode'" :value="el" />

			<!-- 单选控件选项更新 -->
			<UpdateFormNodeOptions v-if="el.type === 'updateListOptions'" :value="el" />

			<!-- 提示信息弹窗 -->
			<MessageBox v-if="el.type === 'messageBox'" :value="el" />

			<!-- 校验弹窗 -->
			<ValidateDialog v-if="el.type === 'validateDialog'" :value="el" />

			<!-- 自定义服务 -->
			<CustomServiceNode v-if="el.type === 'customService'" :value="el" />

			<!-- 平台服务 -->
			<PlatformServiceNode v-if="el.type === 'platformService'" :value="el" />

			<!-- 其他服务 -->
			<ThirdServiceNode v-if="el.type === 'thirdService'" :value="el" />

			<!-- 执行块 -->
			<ExecuteBlockNode v-if="el.type === 'executeBlock'" :value="el" />

			<div v-if="Array.isArray(el.children)">
				<NestedComponent v-model="el.children" />
			</div>
		</template>
	</VueDraggable>
</template>

<style scoped lang="less">
.drag-area {
	min-height: 50px;
	border-left: 1px dashed #606266;
	border-right: 0;
	padding: 0 0 0 5px;
	box-sizing: border-box;

	.drag-area {
		margin: 0 0 0 25px;
	}
}
</style>
