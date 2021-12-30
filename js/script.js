const app = new Vue (
    {
        el: '#app',
        data: {
            active: 0,
            search: '',
            message: '',
            receving: false,
            contacts: [
                {
                    name: "Michele",
                    avatar: "_1",
                    visible: true,
                    state: '',
                    chatLength: 7,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            text: "Hai portato a spasso il cane?",
                            status: "sent",
                            mod: false,
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            text: "Ricordati di dargli da mangiare",
                            status: "sent",
                            mod: false,
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            text: "Tutto fatto!",
                            status: "received",
                            mod: false,
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            text: "Ricordati di dargli da mangiare",
                            status: "sent",
                            mod: false,
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            text: "Tutto fatto!",
                            status: "received",
                            mod: false,
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            text: "Ricordati di dargli da mangiare",
                            status: "sent",
                            mod: false,
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            text: "Tutto fatto!",
                            status: "received",
                            mod: false,
                        }
                    ],
                },
                {
                    name: "Fabio",
                    avatar: "_2",
                    visible: true,
                    state: '',
                    messages: [
                        {
                            date: "20/03/2020 16:30:00",
                            text: "Ciao come stai?",
                            status: "sent",
                            mod: false,
                        },
                        {
                            date: "20/03/2020 16:30:55",
                            text: "Bene grazie! Stasera ci vediamo?",
                            status: "received",
                            mod: false,
                        },
                        {
                            date: "20/03/2020 16:35:00",
                            text: "Mi piacerebbe, ma devo andare a fare la spesa.",
                            status: "sent",
                            mod: false,
                        }
                    ],
                },

                {
                    name: "Samuele",
                    avatar: "_3",
                    visible: true,
                    state: '',
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            text: "La Marianna va in campagna",
                            status: "received",
                            mod: false,
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            text: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                            mod: false,
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            text: "Ah scusa!",
                            status: "received",
                            mod: false,
                        }
                    ],
                },
                {
                    name: "Giacomo",
                    avatar: "_4",
                    visible: true,
                    state: '',
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            text: "Lo sai che ha aperto una nuova pizzeria?",
                            status: "sent",
                            mod: false,
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            text: "Si, ma preferirei andare al cinema",
                            status: "received",
                            mod: false,
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            text: "Si, ma preferirei andare al cinema",
                            status: "received",
                            mod: false,
                        }
                    ],
                },
            ]
        },
        methods: {

            // animation
            beforeEnter: 
                function (el) 
                {
                    el.style.opacity = 0
                    el.style.translateY = '-10px'
                },
            enter: 
                function (el, done) 
                {
                    Velocity(el, { opacity: 1, translateY: '0px' }, { duration: 200 })
                    Velocity(el, { fontSize: '1em' }, { complete: done })
                },
            leave: 
                function (el, done) 
                {
                    Velocity(el, { translateY: '-12px', opacity: 0}, { duration: 200 }, { complete: done })
                },
            // animation

            onlySpaces:
                function(str)
                {
                    return str.trim().length === 0;
                },
            onWrite:
                function(array)
                {
                    array.state = "Stai scrivendo ...";
                },
            noWrite:
                function(array)
                {
                    array.state = "";
                },
            selected: 
                function(index) 
                {
                    this.active = index;
                },
            newMessage: 
                function()
                {
                    let Obj = this.contacts[this.active].messages;
                    if(this.onlySpaces(this.message) == false)
                    {
                        let d = new Date();
                        let newObj = {
                            date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes() + 1}:${d.getSeconds()}`,
                            text: this.message,
                            status: "sent",
                        };

                        Obj.push(newObj);
                        this.contacts[this.active].state = "Stà scrivendo ...";
                        if(!this.receving)
                        {
                            let recevingMess = setTimeout(event => 
                                {
                                    let d = new Date();
                                    let newAnswer = {
                                        date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes() + 1}:${d.getSeconds()}`,
                                        text: 'ok',
                                        status: "received",
                                    };
                                    this.contacts[this.active].state = "";
                                    Obj.push(newAnswer);
                                    this.receving = false;
    
                                }, 2000);
                                this.receving = true;
                        }
                    }
                    this.message = '';
                },
            nextElement: 
                function(element, index)
                {
                    return element[index + 1];
                },
            
        },
        watch: 
        {
            search: 
                function()
                {
                    if(this.search != '')
                    {
                        let filtered = this.contacts.filter((element) => {
                            return element.name.toLowerCase().indexOf(this.search) > -1;
                        });
            
                        this.contacts.forEach(element => {
                            if(filtered.includes(element))
                            {
                                element.visible = true;
                            }
                            else
                            {
                                element.visible = false;
                            }
                        });
                    }
                    else 
                    {
                        this.contacts.forEach(element => {
                            element.visible = true;
                        });
                    }
                },
            receving:
                function()
                {
                    console.log(this.receving);
                },
        //     active:
        //         function()
        //         {
        //             let container = document.querySelector(".message-container");
        //             let Obj = this.contacts[this.active].messages;
        //             let classes;
        //             let tail;
        //             container.innerHTML = '';
        //             Obj.forEach((element, index, array) => {
        //                 if(index == 0)
        //                 {
        //                     if(element.status == "sent")
        //                     {
        //                         classes = "sent first-sent";
        //                         tail = `<span class="tail-message-sent">
        //                                     <svg viewBox="0 0 8 13" width="8" height="13" class="">
        //                                         <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
        //                                         <path fill="#D5F9BA" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path>
        //                                     </svg>
        //                                 </span>`;
        //                     }
        //                     else
        //                     {
        //                         classes = "received first-rece";
        //                         tail = `<span data-testid="tail-in" data-icon="tail-in" class="tail-message-rece">
        //                                     <svg viewBox="0 0 8 13" width="8" height="13" class="">
        //                                         <path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path>
        //                                         <path fill="#FFFFFF" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path>
        //                                     </svg>
        //                                 </span>`;
        //                     }
        //                 }
        //                 else    if(element.status == "sent")
        //                         {
        //                             classes = "sent";
        //                             if(array[index - 1].status != element.status)
        //                             {
        //                                 classes += " first-sent";
        //                                 tail = `<span class="tail-message-sent">
        //                                             <svg viewBox="0 0 8 13" width="8" height="13" class="">
        //                                                 <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
        //                                                 <path fill="#D5F9BA" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path>
        //                                             </svg>
        //                                         </span>`;
        //                             }
        //                             else
        //                             {
        //                                 tail = ''; 
        //                             }
        //                         }
        //                         else
        //                         {
        //                             classes = "received";
        //                             if(array[index - 1].status != element.status)
        //                             {
        //                                 classes += " first-rece";
        //                                 tail = `<span data-testid="tail-in" data-icon="tail-in" class="tail-message-rece">
        //                                             <svg viewBox="0 0 8 13" width="8" height="13" class="">
        //                                                 <path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path>
        //                                                 <path fill="#FFFFFF" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path>
        //                                             </svg>
        //                                         </span>`;
        //                             }
        //                             else
        //                             {
        //                                 tail = ''; 
        //                             }
        //                         }


        //                 container.innerHTML += `
        //                 <div class="card-message ${classes}">
        //                     <span class="text-card">
        //                         ${element.text}
        //                     </span>
        //                     <span class="date-card">
        //                         ${element.date}
        //                     </span>
        //                     <span class="chevron">
        //                         <i class="fa-solid fa-chevron-down"></i>
        //                     </span>
        //                     ${tail}
                            
        //                 </div>
        //                 `;
        //                 console.log(array[index + 1].status);
        //             })
        //         },
        // contacts:
        // function()
        //         {
        //             let container = document.querySelector(".message-container");
        //             let Obj = this.contacts[this.active].messages;
        //             let classes;
        //             let tail;
        //             container.innerHTML = '';
        //             Obj.forEach((element, index, array) => {
        //                 if(index == 0)
        //                 {
        //                     if(element.status == "sent")
        //                     {
        //                         classes = "sent first-sent";
        //                         tail = `<span class="tail-message-sent">
        //                                     <svg viewBox="0 0 8 13" width="8" height="13" class="">
        //                                         <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
        //                                         <path fill="#D5F9BA" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path>
        //                                     </svg>
        //                                 </span>`;
        //                     }
        //                     else
        //                     {
        //                         classes = "received first-rece";
        //                         tail = `<span data-testid="tail-in" data-icon="tail-in" class="tail-message-rece">
        //                                     <svg viewBox="0 0 8 13" width="8" height="13" class="">
        //                                         <path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path>
        //                                         <path fill="#FFFFFF" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path>
        //                                     </svg>
        //                                 </span>`;
        //                     }
        //                 }
        //                 else    if(element.status == "sent")
        //                         {
        //                             classes = "sent";
        //                             if(array[index - 1].status != element.status)
        //                             {
        //                                 classes += " first-sent";
        //                                 tail = `<span class="tail-message-sent">
        //                                             <svg viewBox="0 0 8 13" width="8" height="13" class="">
        //                                                 <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
        //                                                 <path fill="#D5F9BA" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path>
        //                                             </svg>
        //                                         </span>`;
        //                             }
        //                             else
        //                             {
        //                                 tail = ''; 
        //                             }
        //                         }
        //                         else
        //                         {
        //                             classes = "received";
        //                             if(array[index - 1].status != element.status)
        //                             {
        //                                 classes += " first-rece";
        //                                 tail = `<span data-testid="tail-in" data-icon="tail-in" class="tail-message-rece">
        //                                             <svg viewBox="0 0 8 13" width="8" height="13" class="">
        //                                                 <path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path>
        //                                                 <path fill="#FFFFFF" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path>
        //                                             </svg>
        //                                         </span>`;
        //                             }
        //                             else
        //                             {
        //                                 tail = ''; 
        //                             }
        //                         }


        //                 container.innerHTML += `
        //                 <div class="card-message ${classes}">
        //                     <span class="text-card">
        //                         ${element.text}
        //                     </span>
        //                     <span class="date-card">
        //                         ${element.date}
        //                     </span>
        //                     <span class="chevron">
        //                         <i class="fa-solid fa-chevron-down"></i>
        //                     </span>
        //                     ${tail}
                            
        //                 </div>
        //                 `;
        //                 console.log(array[index + 1].status);
        //             })
        //         }

        },
        created()
        {
            console.log(this.receving);
        }
    }
)
  