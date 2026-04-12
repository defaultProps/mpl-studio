<template>
  <div class="mpl-van-table">
    <div class="mpl-van-table-tool">
      <button type="button" style="background: #196eff; color: #fff;">
        添加
      </button>
      <button>导入</button>
      <button>导出</button>
    </div>
    <div class="mpl-van-table-content">
      <table cellspacing="0">
        <thead>
          <tr>
            <th scope="col">
              序号
            </th>
            <th scope="col">
              用户名
            </th>
            <th scope="col">
              账户名
            </th>
            <th scope="col">
              密码
            </th>
            <th scope="col">
              籍贯
            </th>
            <th scope="col">
              出生日期
            </th>
            <th scope="col">
              社保
            </th>
            <th scope="col">
              医保
            </th>
            <th scope="col">
              公积金
            </th>
            <th scope="col">
              贷款余额
            </th>
            <th scope="col">
              户籍
            </th>
            <th scope="col">
              年龄
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>张三</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>2</td>
            <td>李四</td>
            <td>数据</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td>数据</td>
          </tr>
          <tr>
            <td>3</td>
            <td>王五</td>
            <td />
            <td />
            <td />
            <td>数据</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td>4</td>
            <td>二麻子</td>
            <td>数据</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .mpl-van-table {
    overflow: hidden;
    width: 100vw;

    .mpl-van-table-tool {
      height: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;

      button {
        font-size: 14px;
        height: 30px;
        border-radius: 3px;
        border: 1px solid #ccc;
        color: #333;
      }

      button+button {
        margin-left: 10px;
      }
    }

    .mpl-van-table-content {
      overflow: auto;
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;

      table {
        font-size: 14px;
        color: #333;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;

        thead {
          background: #ccccccbf;

          tr {
            height: 30px;

            th {
              border-left: 1px solid #ccc;
              border-top: 1px solid #ccc;
              padding: 3px 10px;
              font-size: 14px;
              color: #333;
              white-space: nowrap;
            }
          }
        }

        tbody {
          tr {
            height: 30px;

            &:nth-child(2n) {
              background: #f0f0f0;
            }

            td {
              border-left: 1px solid #ccc;
              border-top: 1px solid #ccc;
              padding: 3px 5px;
              color: #333;
              white-space: nowrap;
              padding: 0 10px;
              text-align: left;
            }
          }
        }
      }
    }
  }
</style>
