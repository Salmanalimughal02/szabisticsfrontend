import { HeaderWithIconPropsTypes } from '../../Types/Apps/SocialApp/SocialApp'
import { Button, CardHeader } from 'reactstrap'
import { ChevronDown, ChevronUp } from 'react-feather'
import H2 from '../Headings/H2Element'

const HeaderWithIcon = ({ setIsOpen, isOpen, Heading }: HeaderWithIconPropsTypes) => {
  return (
    <CardHeader>
      <H2 className="mb-0">
        <Button
          className="btn-link btn-block text-start d-flex justify-content-between"
          onClick={() => setIsOpen(!isOpen)}
          color="transperant"
        >
          {Heading}
          {isOpen ? (
            <ChevronUp className="m-0" />
          ) : (
            <ChevronDown className="m-0" />
          )}
        </Button>
      </H2>
    </CardHeader>
  )
}

export default HeaderWithIcon