import { useState } from "react";
import Todos from "./pages/Todos.jsx";
import Animation from "./pages/Animation.jsx";
import Calculator from "./pages/Calculator.jsx";
import { FacebookIcon, XBrandIcon } from "./components/Icons.jsx";

const ACCOUNT = { email: "paweekorn.ped@spumail.net", password: "0806927933" };
const ME = { name: "Paweekorn Pedkaew", role: "owner", email: ACCOUNT.email, phone: "0625291482", studentLine: "68085725 ปวีณ์กร เป็ดแก้ว" };
const SKILLS = ["React", "JavaScript (ES6+)", "HTML5", "CSS3", "State Management (useState/useReducer)", "Animation (requestAnimationFrame)", "REST API / Fetch", "Git & GitHub", "Vite", "Responsive UI"];
const ROUTES = [["home","Home"],["calculator","Calculator"],["animation","Animation"],["todos","Todos"],["products","Products (123)"],["carts","Carts"]];
const WORDS = "officia porro iure quia iusto culpa odio esse rerum omnis accusamus beatae facilis natus nisi aut qui eius".split(" ");
const HUES = [120,350,35,210,260,20,180,60,300,0];
const PRODUCTS = Array.from({length:123},(_,i)=>({id:i+1,title:WORDS[i%WORDS.length]+" "+WORDS[(i*7+3)%WORDS.length]+" "+WORDS[(i*5+1)%WORDS.length],price:+(((i*37.13)%75)+2.49).toFixed(2),hue:HUES[i%HUES.length]}));
const money = n => "$"+Number(n).toFixed(2);

function Login({onLogin}) {
 const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [role,setRole]=useState("user"); const [show,setShow]=useState(false); const [error,setError]=useState("");
 const submit=e=>{e.preventDefault();if(email.trim().toLowerCase().replace("@spumail.net","")===ACCOUNT.email.replace("@spumail.net","")&&password.trim()===ACCOUNT.password){onLogin(role);setError("");}else setError("Invalid username or password");};
 return <div className="loginScreen"><div className="loginBlur"><header className="siteHeader"><div className="logo">{["C","S","I","2","0","5"].map((x,i)=><b key={i}>{x}</b>)}</div><div className="tagline">FRONT END SOFTWARE DEVELOPMENT</div></header><div className="loginPreview"></div></div><div className="loginShade"></div><form className="loginModal" onSubmit={submit}><h2>Who are you?</h2><label className="loginField"><span>ID</span><input aria-label="Email" type="text" placeholder="user | admin | manager" value={email} onChange={e=>setEmail(e.target.value)} required/><small>@spumail.net</small></label><label className="loginField"><span>PW</span><input aria-label="Password" type={show?"text":"password"} placeholder="pass" value={password} onChange={e=>setPassword(e.target.value)} required/><button type="button" className="showPass" onClick={()=>setShow(v=>!v)}>{show?"Hide":"Show"}</button></label><label className="roleSelect">Role <select value={role} onChange={e=>setRole(e.target.value)}><option value="user">user</option><option value="admin">admin</option><option value="manager">manager</option></select></label>{error&&<p className="loginError">{error}</p>}<div className="loginActions"><button type="submit">Login</button></div></form></div>;
}

function Home(){
 return <div className="homeCards">
 <section className="panel"><h3>Profile</h3><div className="profile"><div><p><b>Name:</b> {ME.name}</p><p><b>Role:</b> owner</p><p><b>Email:</b> {ME.email}</p></div><img className="avatar profilePhoto" src="/images/profile.jpg" alt="Neti Charoenphoj profile"/></div></section>
 <section className="panel"><h3>Skills</h3><div className="pills">{SKILLS.map(s=><span key={s}>{s}</span>)}</div></section>
 <section className="panel"><h3>Contact</h3><p><b>Email:</b> {ME.email}</p><p><b>Phone:</b> {ME.phone}</p></section></div>;
}

function Products({onAdd}){return <div className="productViewport"><div className="productGrid">{PRODUCTS.map(p=><article className="product" key={p.id}><div className="productImage" style={{background:"linear-gradient(145deg,hsl("+p.hue+" 45% 38%),hsl("+((p.hue+45)%360)+" 45% 15%))"}}><img src={"https://picsum.photos/seed/csi205-"+p.id+"/300/400"} alt={p.title} loading="lazy" onError={e=>{e.currentTarget.style.display="none";}}/><b>{money(p.price)}</b><span>{p.title}</span></div><button onClick={()=>onAdd(p)}>Add to Carts</button></article>)}</div></div>;}
function Carts({cart,onRemove,onQuantity}){const total=cart.reduce((s,p)=>s+p.price*p.quantity,0),count=cart.reduce((s,p)=>s+p.quantity,0);return <><div className="cartBox">{cart.length?cart.map(p=><div className="cartRow" key={p.id}><span>{p.title}</span><span>{money(p.price)} <button onClick={()=>onQuantity(p.id,-1)}>−</button> {p.quantity} <button onClick={()=>onQuantity(p.id,1)}>+</button> <button className="deleteBtn" onClick={()=>onRemove(p.id)}>Delete</button></span></div>):<p className="center muted">Nothing</p>}</div><div className="totals"><span>Count: {count} items</span><span>Price: {money(total)}</span></div></>;}

export default function App(){
 const [authenticated,setAuthenticated]=useState(false),[loginRole,setLoginRole]=useState("user"),[route,setRoute]=useState("home"),[cart,setCart]=useState([]);
 const logout=()=>{setAuthenticated(false);setRoute("home");setCart([]);};
 const addToCart=p=>setCart(old=>{const found=old.find(x=>x.id===p.id);return found?old.map(x=>x.id===p.id?{...x,quantity:x.quantity+1}:x):[...old,{...p,quantity:1}];});
 const quantity=(id,delta)=>setCart(old=>old.map(p=>p.id===id?{...p,quantity:p.quantity+delta}:p).filter(p=>p.quantity>0));
 const pages={home:<Home/>,calculator:<Calculator/>,animation:<Animation/>,todos:<Todos/>,products:<Products onAdd={addToCart}/>,carts:<Carts cart={cart} onRemove={id=>setCart(p=>p.filter(x=>x.id!==id))} onQuantity={quantity}/>};
 if(!authenticated)return <Login onLogin={role=>{setLoginRole(role);setAuthenticated(true);}}/>;
 return <div className="appShell"><header className="siteHeader"><div className="logo">{["C","S","I","2","0","5"].map((x,i)=><b key={i}>{x}</b>)}</div><div className="tagline">FRONT END SOFTWARE DEVELOPMENT</div><div className="info"><span><b>ROLE:</b> <em>{ME.role.toUpperCase()}</em></span><span><b>NAME:</b> <strong>{ME.name}</strong></span><span><b>EMAIL:</b> <em className="mail">{ME.email}</em></span></div><nav className="nav">{ROUTES.map(([key,label])=><button key={key} className={route===key?"navActive":""} onClick={()=>setRoute(key)}>{label}{key==="carts"&&<small>{cart.reduce((n,p)=>n+p.quantity,0)}</small>}</button>)}<button className="logout" onClick={logout}>Logout</button></nav></header><main className="mainContent">{pages[route]}</main><footer className="footer"><span>{ME.studentLine}</span><div><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="fb"><FacebookIcon/></a><i/><a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X"><XBrandIcon/></a></div></footer></div>;
}





