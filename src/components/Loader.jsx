import React from "react";
import Spinner from "react-loader-spinner";

/**
 * 공통 로더 컴포넌트
 *
 * @Component
 * @author frisk
 */
const Loader = () => (
    <div className="fr-loader">
        <Spinner
            type="ThreeDots"
            color="#4142DD"
            height={80}
            width={80}
            visible={true}
        />
    </div>
);

export default Loader;
