import { HeaderDiv, H1, Img, DivFlex } from "./style"
import leaf from '../../assets/img/leaf.svg'
import { useState } from "react"
import { Ul } from "../../pages/Home/style"

const Header = () => {

    const [menu, setMenu] = useState(false)
    const userImage: string | null = localStorage.getItem('userImage') as string


  return (
    <HeaderDiv>
        <DivFlex> 
            <H1> Luffy </H1>
            <Img borderRadius="0" width={'20px'} src={leaf} />
        </DivFlex>
        <div>
        {menu && (
            <Ul>
                <li> Profile </li>
                <li> Others </li>
            </Ul>
            )}
            <Img onClick={() => setMenu(!menu)} src={userImage} alt="Profile" />
        </div>
        
    </HeaderDiv>
  )
}

export default Header
