import { CardContainer, CardBody, CardItem } from './Card3D';
import Typewriter from './Typewriter';
import SocialLinks from './SocialLinks';

const BG_IMAGE = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80';
const AVATAR = import.meta.env.BASE_URL + 'prof.jpg';

export default function ProfileCard() {
  return (
    <CardContainer containerClassName="w-full">
      <CardBody className="profile-card">
        <div
          className="profile-bg"
          style={{ backgroundImage: `url(${BG_IMAGE})` }}
        />
        <div className="profile-content">
          <CardItem as="span" translateZ={80} className="block">
            <img
              src={AVATAR}
              alt="avatar"
              className="avatar"
              draggable={false}
            />
          </CardItem>
          <CardItem translateZ={50}>
            <h1 className="name">brendan</h1>
          </CardItem>
          <CardItem translateZ={30}>
            <p className="subtitle">
              <Typewriter />
            </p>
          </CardItem>
          <CardItem translateZ={20}>
            <p className="bio">
              kernel developer
            </p>
          </CardItem>
          <CardItem translateZ={15}>
            <SocialLinks />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
