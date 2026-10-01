import {useCallback, useEffect, useState} from 'react';
import {Linking, PermissionsAndroid, Platform} from 'react-native';
import {BASE_SHIP_FEE, VARIANT} from '../constants/student';
import {useCartStore} from '../stores/cartStore';

const KTX_GATE = {
  latitude: 10.8214,
  longitude: 106.6879,
};

const MOCK_ROOM_COORDS = {
  latitude: 10.8245,
  longitude: 106.6892,
};

type PermissionState = 'idle' | 'granted' | 'denied' | 'blocked';

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function haversineKm(
  from: {latitude: number; longitude: number},
  to: {latitude: number; longitude: number},
): number {
  const earthRadiusKm = 6371;
  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.longitude - from.longitude);
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function shippingFeeFromKm(km: number): number {
  if (VARIANT.shipFormula === 'A') {
    return BASE_SHIP_FEE + Math.round(km * 2000);
  }
  return BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
}

export function useCampusLocation() {
  const setShippingFee = useCartStore(state => state.setShippingFee);
  const [status, setStatus] = useState<PermissionState>('idle');
  const [km, setKm] = useState<number | null>(null);
  const [fee, setFee] = useState<number | null>(null);

  const applyPosition = useCallback(
    (coords: {latitude: number; longitude: number}) => {
      const nextKm = haversineKm(KTX_GATE, coords);
      const nextFee = shippingFeeFromKm(nextKm);
      setKm(nextKm);
      setFee(nextFee);
      setShippingFee(nextFee);
    },
    [setShippingFee],
  );

  const grantWithMockPosition = useCallback(() => {
    setStatus('granted');
    applyPosition(MOCK_ROOM_COORDS);
  }, [applyPosition]);

  const requestLocation = useCallback(async () => {
    if (Platform.OS !== 'android') {
      grantWithMockPosition();
      return;
    }

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'KTXGo Location',
        message: 'KTXGo can dung vi tri de tinh phi ship noi khu.',
        buttonPositive: 'Cho phep',
        buttonNegative: 'Tu choi',
      },
    );

    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      grantWithMockPosition();
      return;
    }

    setStatus(
      result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ? 'blocked'
        : 'denied',
    );
  }, [grantWithMockPosition]);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      setStatus('denied');
      return;
    }

    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(granted => {
      if (granted) {
        grantWithMockPosition();
      } else {
        setStatus('denied');
      }
    });
  }, [grantWithMockPosition]);

  const message =
    status === 'granted'
      ? 'Da co vi tri giao hang'
      : status === 'blocked'
      ? 'Quyen vi tri dang bi chan'
      : status === 'denied'
      ? 'Chua cap quyen vi tri'
      : 'Dang kiem tra quyen vi tri';

  return {
    status,
    km,
    fee,
    message,
    requestLocation,
    openSettings: () => Linking.openSettings(),
  };
}
