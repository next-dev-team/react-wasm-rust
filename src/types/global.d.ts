// Manual export global type

export {};

declare global {
  const SvgComponent: (
    props: React.SVGProps<SVGSVGElement>,
  ) => React.ReactElement;

  interface Window {
    tabsAction: import('use-switch-tabs').ActionType;
    routerBase: string;
    _wasm: typeof import('../../wasm-lib');
  }

  export const _wasm: typeof import('../../wasm-lib');

  /**
   *  ========= Locale ================
   */

  type LangKey = LiteralUnion<'en-US' | 'zh-CN', string>;

  type TranKey = keyof typeof import('@/locales/en-US.json');

  /**
   *  ========= UMI ================
   */
  type RunTimeLayoutConfig = import('@umijs/max').RunTimeLayoutConfig;
  type LayoutSettings =
    import('../../config/defaultSettings/defaultSettings').SettingsConfig;
}
