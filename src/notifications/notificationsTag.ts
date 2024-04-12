import { OneSignal } from "react-native-onesignal";

export function tagCartUpdate(count: string){
  OneSignal.User.addTag("cart_items_count", count)
}