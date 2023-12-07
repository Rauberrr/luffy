import { HeaderDiv, H1, Img, DivFlex } from "./style"
import leaf from '../../assets/img/leaf.svg'
import { useState } from "react"

const Header = () => {

    const [menu, setMenu] = useState(false)

    const handleMenu = () => {
        if(menu === false) {
            setMenu(true)
            return
        } else {
            setMenu(false)
            return
        }
    }

  return (
    <HeaderDiv>
        <DivFlex> 
            <H1> Luffy </H1>
            <Img border="0" width={'20px'} src={leaf} />
        </DivFlex>
        <div>
              <Img onClick={() => handleMenu()} src="https://www.hubspot.com/hs-fs/hubfs/media/fotodeperfil.jpeg?width=610&height=406&name=fotodeperfil.jpeg" alt="Profile" />
            {menu && <p> menu Ok </p>}
        </div>
        
    </HeaderDiv>
  )
}

export default Header
