import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import GoogleIcon from '@/assets/GoogleIcon.svg'
import Um6pIcon from '@/assets/um6pIcon.png'
import ocpIcon from '@/assets/ocpIcon.png'
import foundersIcon from '@/assets/foundersIcon.svg'
import venturesIcon from '@/assets/venturesIcon.png'
import plugAndPlayIcon from '@/assets/plugAndPlugIcon.png'
import mrtbIcon from '@/assets/mrtbIcon.png'

export default function Partners() {
  return (
    <div className="Partners my-20">
      <div className="title text-4xl md:text-5xl font-bold text-center pb-10 leading-[4rem]">
        Partners
      </div>
      <InfiniteMovingCards
        className="w-full !max-w-full"
        speed="normal"
        items={[
          <img className="max-w-32" src={GoogleIcon} alt="Google" />,
          <img className="max-w-32" src={Um6pIcon} alt="um6p icon" />,
          <img className="max-w-32" src={ocpIcon} alt="um6p icon" />,
          <img className="max-w-32" src={foundersIcon} alt="um6p icon" />,
          <img className="max-w-32" src={venturesIcon} alt="um6p icon" />,
          <img className="max-w-32" src={plugAndPlayIcon} alt="um6p icon" />,
          <img className="max-w-32" src={mrtbIcon} alt="um6p icon" />,
        ]}
      />
    </div>
  )
}

