'use client';

import { Label } from '@ui/label';
import { Switch } from '@ui/switch';
import { useEffect, useState } from 'react';
import { H4 } from './ui/typography';

const DeviceAccessControls = () => {
  const [isLocationAvailable, setIsLocationAvailable] = useState(false);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  useEffect(() => {
    setIsLocationAvailable('geolocation' in navigator);

    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        setIsCameraAvailable(
          devices.some((device) => device.kind === 'videoinput')
        );
      })
      .catch((err) => {
        console.error('Error checking camera availability:', err);
        setIsCameraAvailable(false);
      });
  }, []);

  const toggleLocation = (checked: boolean) => {
    if (isLocationAvailable) {
      setIsLocationEnabled(checked);
      if (checked) {
        navigator.geolocation.getCurrentPosition(
          () => console.log('Location access granted'),
          (error) => console.error('Error accessing location:', error)
        );
      }
    }
  };

  const toggleCamera = (checked: boolean) => {
    if (isCameraAvailable) {
      setIsCameraEnabled(checked);
      if (checked) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            stream.getTracks().forEach((track) => track.stop());
            console.log('Camera access granted');
          })
          .catch((err) => console.error('Error accessing camera:', err));
      }
    }
  };

  return (
    <div className="space-y-4">
      <H4>開啟裝置權限</H4>
      <div className="flex items-center space-x-2">
        <Switch
          checked={isLocationEnabled}
          onCheckedChange={toggleLocation}
          disabled={!isLocationAvailable}
          id="location-switch"
        />
        <Label htmlFor="location-switch">
          {isLocationAvailable ? '開啟定位' : '定位不可用'}
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={isCameraEnabled}
          onCheckedChange={toggleCamera}
          disabled={!isCameraAvailable}
          id="camera-switch"
        />
        <Label htmlFor="camera-switch">
          {isCameraAvailable ? '開啟相機' : '相機不可用'}
        </Label>
      </div>
    </div>
  );
};

export default DeviceAccessControls;
