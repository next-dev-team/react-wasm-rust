import { add, dec, greet } from 'wasm-lib';

const Login = () => {
  const [count, setCount] = useState(0);
  const handleAdd = () => {
    setCount((prev) => add(prev, 1));
  };
  const handleDec = () => {
    setCount((prev) => dec(prev, 1));
  };

  return (
    <PageContainer>
      <Space>
        <Button onClick={handleDec} danger>
          Dec -
        </Button>
        <GText>{count}</GText>
        <Button type="primary" onClick={handleAdd}>
          Add +
        </Button>
        <Button>{greet('Sila')}</Button>
      </Space>
    </PageContainer>
  );
};

export default Login;
