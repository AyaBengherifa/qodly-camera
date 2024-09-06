import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState, useRef } from 'react';
import { Camera } from 'react-camera-pro'; 
import { ICameraproProps } from './Camerapro.config';
import { AiOutlineCamera } from 'react-icons/ai';

const Camerapro: FC<ICameraproProps> = ({  style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [image, setImage] = useState<string | null>(null); 
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

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const capturedImage = cameraRef.current.takePhoto();
      console.log('Captured Image:', capturedImage);
    
      const mimeType = capturedImage?.substring(0, capturedImage.indexOf(';')); 
      console.log('MIME Type:', mimeType);
  
      setImage(capturedImage);
  
      if (ds) {
        try {
          await ds.setValue<any>(null, capturedImage);
          console.log('Image saved to datasource');
        } catch (error) {
          console.error('Error updating datasource:', error);
        }
      }
    }
  };
  
console.log(ds)

 

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
    {image && <img src={image} alt="Captured" className="mt-4 w-32 h-auto" />} 
  </div>
);
  
};

export default Camerapro;
