import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaCamera } from "react-icons/fa";
import CameraproSettings, { BasicSettings } from './Camerapro.settings';

export default {
  craft: {
    displayName: 'Camerapro',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(CameraproSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Camerapro',
    exposed: true,
    icon:FaCamera,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      accept: ['entity'],
    },
  },
  defaultProps: {
    name: 'Qodly',
  },
} as T4DComponentConfig<ICameraproProps>;

export interface ICameraproProps extends webforms.ComponentProps {
  name?: string;
}
