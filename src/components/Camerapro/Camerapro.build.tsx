import { useEnhancedNode } from '@ws-ui/webform-editor';
import { FC } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { ICameraproProps } from './Camerapro.config';

const Camerapro: FC<ICameraproProps> = ({ style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  return (
    <span
      ref={connect}
      style={style}
      className={`flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 ${className} ${classNames.join(' ')}`}
    >
      <AiOutlineCamera className="w-8 h-8 text-gray-600" />
    </span>
  );
};

export default Camerapro;
