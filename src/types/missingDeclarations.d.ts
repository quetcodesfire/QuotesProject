declare module '@shipt/react-native-tachyons' {
  import { TextStyle, ViewStyle } from 'react-native';

  type TachyonFunction<T> = (props: T) => string;

  export function styled<Props, T>(
    component: T,
    style?: ViewStyle | TextStyle
  ): (
    literals: TemplateStringsArray,
    ...tachyonFunctions: Array<TachyonFunction<React.ComponentProps<T> & Props> | string>
  ) => React.FC<React.ComponentProps<T> & Props>;

  export function styledWithRefForwarding<Props, T>(
    component: T,
    style?: ViewStyle | TextStyle
  ): (
    literals: TemplateStringsArray,
    ...tachyonFunctions: Array<TachyonFunction<React.ComponentProps<T> & Props> | string>
  ) => React.FC<React.ComponentProps<T> & Props & { ref?: React.Ref<T> }>;

  export function T(tachyons: string): any;
}
