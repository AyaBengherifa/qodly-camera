import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useRef } from 'react';
import { Camera } from 'react-camera-pro'; 
import { ICameraproProps } from './Camerapro.config';
import { AiOutlineCamera } from 'react-icons/ai';

const Camerapro: FC<ICameraproProps> = ({  style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [image, setImage] = useState<any>(); 
  const {
    sources: { datasource: ds },
  } = useSources();
  const cameraRef = useRef<{ takePhoto: () => string }>(null);

  useEffect(() => {
    if (!ds) return;

    const listener = async () => {
      const v = await ds.getValue<string>();
      setImage(v || null); 
    };

    listener();
    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
  }, [ds]);

  const base64ToBlob = (base64: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };
  const capturePhoto = async () => {
    if (cameraRef.current) {
      const capturedImage = cameraRef.current.takePhoto();
      const base64Data = capturedImage.split(',')[1];
      const imageBlob = base64ToBlob(base64Data, 'image/jpeg');
      const imageFile = new File([imageBlob], 'captured_photo.jpg', {
        type: 'image/jpeg',
      });

      await ds.setValue<any>(null, imageFile);
    }
    
  };

return (
  <div
    ref={connect}
    style={style}
    className={cn(className, classNames, 'flex items-center space-x-4 p-4 bg-gray-100 rounded-lg border border-gray-300')}
  >
    <Camera
      ref={cameraRef}
      aspectRatio={16 / 9}
      errorMessages={{
        noCameraAccessible: 'Camera not accessible',
        permissionDenied: 'Permission denied',
        switchCamera: 'Switch camera',
        canvas: 'Canvas error'
      }}
    />
    <button
      onClick={capturePhoto}
      className="p-3 bg-gray-200 rounded-full border-2 border-gray-300"
    >
      <AiOutlineCamera className="w-10 h-10 text-gray-600" /> 
    </button>
    {image && <span>captured</span>} 
  </div>
);
  
};

export default Camerapro;
