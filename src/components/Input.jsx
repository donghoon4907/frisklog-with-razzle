import React, { forwardRef } from "react";

/**
 * * 공통 input 컴포넌트
 *
 * @Component
 * @author frisk
 */
const Input = forwardRef(({ setValue, ...props }, ref) => (
    <input className="fr-form__input" ref={ref} {...props} />
));

export default Input;
