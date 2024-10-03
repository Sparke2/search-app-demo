import { Fragment } from "react"
import Footer from '../components/Footer';
import Header from '../components/Header';
export const AppLayout = ({children, Wrapper = Fragment}) => {
    return (
        <Wrapper>
            <Header/>
            {children}
            <Footer/>
        </Wrapper>
    )
}