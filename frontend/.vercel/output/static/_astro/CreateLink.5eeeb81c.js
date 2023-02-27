import{r as s}from"./index.45a47ed6.js";import{j as e,a as i,e as l}from"./jsx-runtime.d0805258.js";import{N as a}from"./NotLogedIn.d6de0750.js";function p(){const[t,n]=s.useState();return s.useEffect(()=>{async function o(){await i().then(r=>{n(r)})}o()},[]),t?e.jsx("div",{className:"relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-500",children:e.jsxs("div",{className:"w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl",children:[e.jsx("h1",{className:"text-3xl font-semibold text-center text-purple-700",children:"Enter Link to Shorten"}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"oLink",className:"block text-sm font-semibold text-gray-800",children:"Original Link"}),e.jsx("input",{id:"oLink",type:"Link",className:"block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"sLink",className:"block text-sm font-semibold text-gray-800",children:"Short Link"}),e.jsx("input",{id:"sLink",type:"Link",className:"block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"})]}),e.jsx("div",{className:"mt-6",children:e.jsx("button",{onClick:c,className:"w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600",children:"Shorten"})})]})}):e.jsx(a,{})}async function c(){const t=document.getElementById("oLink").value,n=document.getElementById("sLink").value,o=await l(t,n);window.alert(o)}export{p as default};
