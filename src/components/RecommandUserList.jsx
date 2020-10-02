import React, { memo } from "react";
import RecommandUserItem from "./RecommandUserItem";
import { GET_USERS } from "../graphql/query/user";
import Query from "./Query";

/**
 * 추천 사용자 목록 컴포넌트
 *
 * @Component
 * @author frisk
 */
const RecommandUserList = () => (
    <div>
        <Query
            query={GET_USERS}
            variables={{
                first: 5,
                orderBy: "postCount_DESC"
            }}
        >
            {({ data: { users } }) =>
                users.map((user) => (
                    <RecommandUserItem key={user.id} {...user} />
                ))
            }
        </Query>
    </div>
);

export default memo(RecommandUserList);
