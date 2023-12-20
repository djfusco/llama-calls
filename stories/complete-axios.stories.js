import { html } from 'lit';
import '../src/complete-axios.js';

export default {
  title: 'CompleteAxios',
  component: 'complete-axios',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <complete-axios
      style="--complete-axios-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </complete-axios>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
