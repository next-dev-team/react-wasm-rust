import { AhooksPresent } from './ahooks-present'
import { antdIconPresent } from './antd-icons-present'
import { antdPresent } from './antd-present'
import { umiPresent } from './umi-presents'

export const autoImportPlugin = () =>
  require('unplugin-auto-import/webpack').default({
    dts: './auto-import.d.ts',
    include: [
      /\.[t]sx?$/, // .ts, .tsx,
    ],
    imports: [
      'react',
      {
        'antd/es': antdPresent,
        // 'lodash-es': lodashPresent,
        ahooks: AhooksPresent,
        '@ant-design/icons': antdIconPresent,
        '@umijs/max': umiPresent,
        // 'next-dev-utils/dist': nextDevPresent,
        // 'next-dev-antd-ui/dist': unplugPresent,
      },
    ],
    vueTemplate: false,

    // Auto import for all module exports under directories
    // when using in file names mostly use prefixes _ and $ to avoid conflicts
    dirs: [
      // './xx/**', // all nested modules
      './src/utils/**',
      './src/stores/**',
      './src/hooks',
      './src/constants/**',
      './src/components',
      // automatically import for graphql
      './src/graphql/**',
    ],
    resolvers: [],
  })
