import React from 'react';
import HowItWorks from '../../components/Home/HowItWorks';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import HeroSlider from '../../components/Home/HeroSlider';

const Home = () => {
    return (
        <div>
            this is home page


            <section className=''>
                <HeroSlider></HeroSlider>
            </section>
            <section className=''>
                <HowItWorks></HowItWorks>
            </section>
            <section>
                <WhyChooseUs></WhyChooseUs>
            </section>
        </div>
    );
};

export default Home;