import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'

export async function getLocationAsync(
  onSend: (locations: { location: Location.LocationObjectCoords }[]) => void
) {
  const response = await Location.requestForegroundPermissionsAsync()
  if (!response.granted)
    return

  const location = await Location.getCurrentPositionAsync()
  if (!location)
    return

  onSend([{ location: location.coords }])
}

export async function pickImageAsync(
  onSend: (images: { image: string }[]) => void
) {
  const response = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (!response.granted)
    return

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  })

  if (result.canceled)
    return

  const images = result.assets.map(({ uri: image }) => ({ image }))
  onSend(images)
}

export async function takePictureAsync(
  onSend: (images: { image: string }[]) => void
) {
  const response = await ImagePicker.requestCameraPermissionsAsync()
  if (!response.granted)
    return

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  })

  if (result.canceled)
    return

  const images = result.assets.map(({ uri: image }) => ({ image }))
  onSend(images)
}
