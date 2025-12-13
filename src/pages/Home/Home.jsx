import React from 'react';
import HowItWorks from '../../components/Home/HowItWorks';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import HeroSlider from '../../components/Home/HeroSlider';
import LatestTuitions from '../../components/Home/LatestTuitions';

const Home = () => {
    return (
        <div>
            <section className=''>
                <HeroSlider></HeroSlider>
            </section>
            <section>
                <LatestTuitions></LatestTuitions>
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