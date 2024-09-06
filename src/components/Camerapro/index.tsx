import config, { ICameraproProps } from './Camerapro.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Camerapro.build';
import Render from './Camerapro.render';

const Camerapro: T4DComponent<ICameraproProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Camerapro.craft = config.craft;
Camerapro.info = config.info;
Camerapro.defaultProps = config.defaultProps;

export default Camerapro;
