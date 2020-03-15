export type TAnyFunction = (...arg: any[]) => void;
export interface InputEventWithValue extends InputEvent {
  target: HTMLInputElement;
}
