import { useParams } from 'react-router-dom';
import { ViewIdeaRouteParams } from '../lib/routes';

export const ViewIdeaPage = () => {
  const { title } = useParams() as ViewIdeaRouteParams;
  return (
    <div>
      <h1>{title}</h1>
      <p>description</p>
      <div>
        <h2>Comments</h2>
        <ul>
          <li>comment 1</li>
          <li>comment 2</li>
        </ul>
      </div>
    </div>
  );
};
