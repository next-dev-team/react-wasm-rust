import SwitchTabsLayout from '@/components/SwitchTabsLayout';
const Layout = () => {
  const { initialState } = useModels('@@initialState', [
    'initialState',
    'loading',
  ]);
  const { settings } = initialState || {};

  return (
    <>
      <SwitchTabsLayout
        mode={settings?.switchTabs?.mode}
        persistent={settings?.switchTabs?.persistent}
        fixed={settings?.switchTabs?.fixed}
        routes={getMenuData(routesUmi).menuData}
      >
        <ProCard
          bodyStyle={{
            minHeight: 'calc(100vh - 180px)',
          }}
        >
          <Outlet />
        </ProCard>
      </SwitchTabsLayout>

      {!$history.location?.pathname?.includes('/login') && (
        <>{/* <GDevTools /> */}</>
      )}
    </>
  );
};

export default Layout;
