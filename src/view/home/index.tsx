import { defineComponent, reactive } from '@vue/composition-api';

import './index.scss';

export default defineComponent({
  name: 'Home',
  setup(props, context) {
    const state = reactive({
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 12, 15, 16, 20, 1, 1, 1, 1, 1],
    });
    return () => (
      <div id="page-home">
        <table class="tb1_table">
          <thead>
            <tr>
              <th>标题1</th>
              <th>标题2</th>
              <th>标题3</th>
              <th>标题4</th>
              <th>标题5</th>
            </tr>
          </thead>
          <tbody>
            <tr colspan="5">
              <td>
                <div class="dv_table">
                  <table class="tb2_table">
                    <tbody>
                      {state.list.map((item, index) => (
                        <tr>
                          <td>第{index + 1}行123123</td>
                          <td>row 1-2</td>
                          <td>row 1-3</td>
                          <td>row 1-4</td>
                          <td>row 1-5</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
});
