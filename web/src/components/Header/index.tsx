import { HeaderDiv, H1, Img, DivFlex } from "./style"
import leaf from '../../assets/img/leaf.svg'
import { useState } from "react"
import { Ul } from "../../pages/Home/style"

const Header = () => {

    const [menu, setMenu] = useState(false)


  return (
    <HeaderDiv>
        <DivFlex> 
            <H1> Luffy </H1>
            <Img border="0" width={'20px'} src={leaf} />
        </DivFlex>
        <div>
        {menu && (
            <Ul>
                <li> Profile </li>
                <li> Others </li>
            </Ul>
            )}
            <Img onClick={() => setMenu(!menu)} src="https://www.hubspot.com/hs-fs/hubfs/media/fotodeperfil.jpeg?width=610&height=406&name=fotodeperfil.jpeg" alt="Profile" />
        </div>
        
    </HeaderDiv>
  )
}

export default Header
