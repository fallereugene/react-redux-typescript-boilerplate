import { Response as MResponse } from 'miragejs';

export default (context: any) => {
    context.get(`http://jsonplaceholder.typicode.com/posts`, (schema: any) => {
        return new MResponse(401);
        return schema.db.list;
    });
};
