import mplVar from '@mpl/var'
import mplEvent from '@mpl/event'

asyncComponent.value = {
  setup() {
    return {
      username: ref('1'),
      password: ref('234')
      ...mplVar // 极致压缩，只保留有效数据【未更改数据不存储】
    }
  },
  methods: {
    onSubmit() {
      alert(11)
    }
    ...mplEvent // 组件配置绑定的方法。 内容可实时在线更新，无需部署。采用 vue-ssr
  },
  template: `
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <mpl-base-input cid="qw3er4" />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  `
}