import React, { Component } from "react";
import Loader from "./Loader";

/**
 * * 스크롤 이벤트 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.loading   요청 중 여부
 * @param props.onBottom  조건부 실행 함수
 */
class Scroll extends Component {
    /**
     * 스크롤 이벤트
     */
    handleScroll = () => {
        const { loading, onBottom } = this.props;

        if (!loading) {
            const $main = document.querySelector("#main");

            const { scrollHeight, clientHeight, scrollTop } = $main;

            if (scrollTop + clientHeight === scrollHeight) {
                onBottom();
            }
        }
    };
    /**
     * 라이프 사이클:마운트
     */
    componentDidMount() {
        const $main = document.querySelector("#main");
        /**
         * 스크롤 이벤트 바인딩
         */
        $main.addEventListener("scroll", this.handleScroll);
    }
    /**
     * 라이프 사이클:언마운트
     */
    componentWillUnmount() {
        const $main = document.querySelector("#main");
        /**
         * 스크롤 이벤트 언바인딩
         */
        $main.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        const { loading } = this.props;

        return loading ? <Loader /> : null;
    }
}

export default Scroll;
