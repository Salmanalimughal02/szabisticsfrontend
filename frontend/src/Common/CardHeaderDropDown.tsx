import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
interface CardHeaderDropDownProps {
    fItem: string;
    sItem: string;
    tItem: string;
    mainTitle?: boolean;
}
const CardHeaderDropDown = ({fItem , sItem ,tItem ,mainTitle}:CardHeaderDropDownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown className="icon-dropdown" isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle caret color="">
        {mainTitle ? <i className="icon-more-alt" /> : "Today"}
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <DropdownItem>
          {fItem}
        </DropdownItem>
        <DropdownItem>
          {sItem}
        </DropdownItem>
        <DropdownItem>
          {tItem}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CardHeaderDropDown;
