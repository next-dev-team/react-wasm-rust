import { ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { useForm } from 'antd/es/form/Form';
import { isNumber } from 'lodash-es';
import { SelectLang } from 'umi';

type Todo = {
  id: number;
  text: string;
  done: boolean;
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
    fabN: _wasm.fibonacci(10),
  });
  const [formRef] = useForm<Todo>();
  const formId = formRef.getFieldValue('id');
  const title = formId ? t('Edit Todo {id}', { id: formId }) : t('Add Todo');

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

  const submitTodo = async ({ id, done, text, description }: Todo) => {
    const isEditMode = isNumber(id);

    if (isEditMode) {
      wasmTodo.edit_todo_item(id, text, description, !!done);
    } else {
      const newId = (state.todo?.[state.todo.length - 1]?.id || 0) + 1;
      wasmTodo.add_todo_item(newId, text, description, !!done);
    }
    updateTodo();
    state.openModal = false;
  };

  const onRemoveTodo = (item: Todo) => {
    wasmTodo.remove_item(item.id);
    updateTodo();
  };

  const handleEditClick = (item: Todo) => {
    state.openModal = true;
    formRef.setFieldsValue(item);
  };
  const handleFibonacci = (n = 10) => {
    state.fabN = _wasm.fibonacci(n);
  };

  return (
    <>
      <ModalForm
        form={formRef as any}
        width={480}
        onFinish={submitTodo}
        title={title}
        open={state.openModal}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => (state.openModal = false),
        }}
      >
        <ProFormText name="id" hidden label={t('ID')} />
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
            tab: t('Testing'),
            key: 'test',
            children: (
              <Space size="large">
                <Space>
                  <GText>{t('fibonacci of')}</GText>
                  <InputNumber
                    min={1}
                    defaultValue={10}
                    onChange={(value) =>
                      handleFibonacci((value as number) || 1)
                    }
                  />
                  <GText>= {state.fabN}</GText>
                </Space>
                <Space>
                  <Button onClick={handleDec} danger>
                    {t('Decrement')} -
                  </Button>
                  <GText>{count}</GText>
                  <Button type="primary" onClick={handleAdd}>
                    {t('Add')} +
                  </Button>
                </Space>
                <Button>{_wasm.greet('Sila', true)}</Button>
              </Space>
            ),
          },
          {
            tab: t('Todo'),
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
                      {t('Add todo')}
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
                        <Button
                          type="link"
                          onClick={() => handleEditClick(item)}
                        >
                          {t('Edit')}
                        </Button>,
                        <Button
                          size="small"
                          danger
                          onClick={() => onRemoveTodo(item)}
                        >
                          {t('Delete')}
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Space>
                            <GText>
                              {item.id.toString().padStart(2, '0')} -
                            </GText>
                            <GText>{item.text}</GText>
                          </Space>
                        }
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
