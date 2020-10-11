import React from "react";
import { Link } from "react-router-dom";

/**
 * * 공통 버튼 링크 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.to 이동할 url
 */
const BtnLink = ({ to, children }) => (
    <Link to={to} className="fr-btn fr-link" role="button">
        {children}
    </Link>
);
export default BtnLink;
