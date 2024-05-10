import { ProFormTextArea } from '@ant-design/pro-components';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const wasmTodo = new _wasm.TodoList();

const Login = () => {
  const [count, setCount] = useState(0);
  const { refresh } = useModels('@@initialState', ['refresh']);
  const state = _useReactive({
    activeTab: 'todo',
    todo: wasmTodo.get_todo_items() as Todo[],
  });

  const updateTodo = () => {
    state.todo = wasmTodo.get_todo_items();
    refresh();
  };

  const handleAdd = () => {
    setCount((prev) => _wasm.add(prev, 1));
  };
  const handleDec = () => {
    setCount((prev) => _wasm.dec(prev, 1));
  };

  return (
    <PageContainer
      title={t('Welcome to WebAssembly Rust + React')}
      tabActiveKey={state.activeTab}
      tabProps={{
        destroyInactiveTabPane: false,
      }}
      onTabChange={(key) => {
        state.activeTab = key;
      }}
      tabList={[
        {
          tab: 'Testing',
          key: 'test',
          children: (
            <Space>
              <Button onClick={handleDec} danger>
                Dec -
              </Button>
              <GText>{count}</GText>
              <Button type="primary" onClick={handleAdd}>
                Add +
              </Button>
              <Button>{_wasm.greet('Sila')}</Button>
            </Space>
          ),
        },
        {
          tab: 'Todo',
          key: 'todo',
          children: (
            <ProCard
              extra={
                <Space>
                  <Button
                    onClick={() => {
                      Modal.info({
                        closable: true,
                        footer: null,
                        title: 'Add Todo',
                        content: (
                          <ProForm
                            submitter={{
                              render(_, dom) {
                                return dom[1];
                              },
                            }}
                            onFinish={() => {
                              wasmTodo.add_todo_item(
                                state.todo.length,
                                '',
                                false,
                              );
                              updateTodo();
                            }}
                          >
                            <ProFormTextArea
                              name="text"
                              rules={[{ required: true }]}
                              placeholder="Add Todo"
                            />
                          </ProForm>
                        ),
                      });
                    }}
                    type="primary"
                  >
                    Add
                  </Button>
                  <Button danger>{t('Remove All')}</Button>
                </Space>
              }
            >
              <List
                dataSource={state.todo}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        onClick={() => {
                          wasmTodo.remove_item(item.id);
                          updateTodo();
                        }}
                      >
                        Delete
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={item.title}
                      // description={item.description}
                    />
                  </List.Item>
                )}
              />
            </ProCard>
          ),
        },
      ]}
    />
  );
};

export default Login;
