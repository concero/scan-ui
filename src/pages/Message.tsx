import { useParams } from 'react-router-dom';

export const Message = () => {
  const { id } = useParams();
  return <h2> Message Page. ID: {id}</h2>;
};