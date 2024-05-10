import { ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import { SelectLang } from 'umi';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
};

const wasmTodo = new _wasm.TodoList();

const Login = () => {
  const [count, setCount] = useState(0);
  const { refresh } = useModels('@@initialState', ['refresh']);
  const state = _useReactive({
    activeTab: 'todo',
    openModal: false,
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

  const submitTodo = async ({ completed, text, description }: Todo) => {
    try {
      wasmTodo.add_todo_item(state.todo.length, text, description, !!completed);
      updateTodo();
      state.openModal = false;
    } catch (error) {
      message.error(t('Failed to add todo'));
      console.error('error add', error);
    }
  };

  const onRemoveTodo = (item: Todo) => {
    wasmTodo.remove_item(item.id);
    updateTodo();
  };

  return (
    <>
      <ModalForm
        width={480}
        onFinish={submitTodo}
        title="Add Todo"
        open={state.openModal}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => (state.openModal = false),
        }}
      >
        <ProFormText
          label={t('Title')}
          name="text"
          rules={[{ required: true }]}
        />
        <ProFormTextArea
          label={t('Description')}
          name="description"
          rules={[{ required: true }]}
        />
      </ModalForm>
      <PageContainer
        title={t('Welcome to {lang} {lang1} + {lang2}', {
          lang1: 'Rust',
          lang2: 'React',
          lang: 'Wasm',
        })}
        extra={<SelectLang />}
        tabActiveKey={state.activeTab}
        tabProps={{
          destroyInactiveTabPane: false,
          className: 'max-w-screen-md mx-auto',
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
                <Button>{_wasm.greet('Sila', true)}</Button>
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
                      type="primary"
                      onClick={() => (state.openModal = true)}
                    >
                      <PlusOutlined />
                      Add todo
                    </Button>
                    <Popconfirm
                      title={t('Are you sure to remove all todo?')}
                      onConfirm={() => {
                        wasmTodo.remove_item();
                        updateTodo();
                      }}
                    >
                      <Button danger>{t('Remove All')}</Button>
                    </Popconfirm>
                  </Space>
                }
              >
                <List
                  size="small"
                  dataSource={state.todo}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button type="link" onClick={() => onRemoveTodo(item)}>
                          Delete
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={item.text}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </ProCard>
            ),
          },
        ]}
      />
    </>
  );
};

export default Login;
