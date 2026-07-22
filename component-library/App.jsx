
import Badge from './components/Badge'
import Card from './components/Card'
import { BsCloudUpload } from 'react-icons/bs'
import Banner from './components/Banner'
import Testimonial from './components/Testimonial'

export default function App() {
    return (
        <div class='container'>
            <div class='badge-row'>
                <Badge
                    color={'red'}
                    variant={'square'}
                >
                    Badge
                </Badge>

                <Badge
                    color={'grey'}
                    variant={'pill'}
                >
                    Badge
                </Badge>

                <Badge
                    color={'green'}
                    variant={'square'}
                >
                    Badge
                </Badge>

                <Badge
                    color={'blue'}
                    variant={'pill'}
                >
                    Badge
                </Badge>

                <Badge
                    color={'yellow'}
                    variant={'square'}
                >
                    Badge
                </Badge>

                <Badge
                    color={'indigo'}
                    variant={'pill'}
                >
                    Badge
                </Badge>
            </div>

            <div class='banner-container'>

                <Banner variant="success" title="Congratulations!">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Banner>

                <Banner variant="warning" title="Attention">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Banner>

                <Banner variant="error" title="There is a problem with your application">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Banner>

                <Banner variant="neutral" title="Update available">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Banner>

            </div>

            <div class='card-line'>

                <Card icon={<BsCloudUpload />} iconColor="#4F6EF7" title="Easy Deployment">
                    description text
                </Card>

                <Card icon={<BsCloudUpload />} iconColor="red" title="Easy Deployment">
                    description text
                </Card>

                <Card icon={<BsCloudUpload />} iconColor="green" title="Easy Deployment">
                    description text
                </Card>

                <Card icon={<BsCloudUpload />} iconColor="purple" title="Easy Deployment">
                    description text
                </Card>

            </div>

            <div class='testimonial-line'>
                <Testimonial
                    src={'ebbd218e43da4fc0a30598c1777461ca480d0fde.jpg'}
                    alt={'image of May Andersons'}
                    name={'May Andersons'}
                    occupation={'Workcation, CTO'}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed urna nulla vitae laoreet augue. Amet feugiat est integer 
                    dolor auctor adipiscing nunc urna, sit. 
                </Testimonial>
            </div>

        </div>


    )
}