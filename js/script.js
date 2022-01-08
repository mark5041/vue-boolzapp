const app = new Vue (
    {
        el: '#app',
        data: {
            load: true,
            mic: true,
            active: null,
            zoom: false,
            dark: false,
            search: '',
            message: '',
            receving: false,
            contacts: [
                {
                    name: "Michele",
                    avatar: "_1",
                    menu: false,
                    visible: true,
                    state: '',
                    lastAccess: 'il 10/01/2020',
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
                    menu: false,
                    visible: true,
                    state: '',
                    lastAccess: 'il 20/03/2020',
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
                    menu: false,
                    visible: true,
                    state: '',
                    lastAccess: 'il 28/03/2020',
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
                    menu: false,
                    visible: true,
                    state: '',
                    lastAccess: 'il 10/01/2020',
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
            ],
            IAsendingmessages: 
            {
                position: 0,
                messageLibrary: [
                    {
                        message: [
                            "hai tre secondi per dirmi chi sei, altrimenti chiamo la polizia.",
                            "hai sbagliato numero",
                            "chi sei?",
                            "sono un carabiniere, dimmi chi sei oppure ci saranno conseguenze"
                        ]
                    },
                    {
                        message: [
                            "continua pure, io sto già componendo il numero della polizia",
                            "ti piace davvero disturbare le persone",
                            "non hai niente di più importante da fare?",
                            "ma scusa, quanti anni hai per curiosità",
                            "ti piace sprecare tempo vero?",
                            "c'è gente che ha di meglio da fare, perciò smettila",
                            "non farmi arrabbiare",
                            "non fare il maleducato, altrimenti chiamo la polizia!"
                        ]
                    },
                    {
                        message: [
                            "ti blocco",
                            "ti vengo sotto casa",
                            "ti ho appena mandato i sicari sotto casa, preparati",
                            "ti sei appena fatto un nemico potente"
                        ]
                    },
                ],
            },
        },
        methods: {

            // animation app
            beforeEnter: 
                function (el) 
                {
                    el.style.opacity = 0
                    el.style.translateY = '-10px'
                },
            enter: 
                function (el, done) 
                {
                    Velocity(el, { opacity: 1, translateY: '0px' }, { duration: 200 }, { complete: done })
                },
            leave: 
                function (el, done) 
                {
                    Velocity(el, { translateY: '-12px', opacity: 0}, { duration: 200 })
                    Velocity(el, { display: 'none' }, { complete: done })
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
                    if(array.state == "" && this.message != '')
                    {
                        array.state = "Stai scrivendo ...";
                    }
                    else
                    {
                        array.state = "";
                    }
                },
            selected: 
                function(index) 
                {
                    this.active = index;
                    this.IAsendingmessages.position = 0;
                },
            getIAmess:
                function()
                {
                    let newMess;
                    let array = this.IAsendingmessages.messageLibrary[this.IAsendingmessages.position].message;
                    let max = array.length;
                    return newMess = array[Math.floor(Math.random() * max)];
                },
            newMessage: 
                function()
                {
                    let Obj = this.contacts[this.active].messages;
                    if(this.onlySpaces(this.message) == false)
                    {
                        let now = dayjs();
                        const data = `${now.format('DD/MM/YYYY HH:mm:ss')}`;
                        let newObj = {
                            date: data,
                            text: this.message,
                            status: "sent",
                            mod: false,
                        };

                        console.log(data);
                        Obj.push(newObj);
                        this.contacts[this.active].state = "online";
                        if(this.receving == false)
                        {
                            setTimeout(event => {
                                this.contacts[this.active].state = "Stà scrivendo ...";
                                setTimeout(event => {
                                    let mess = this.getIAmess();
                                    let now = dayjs();
                                    const data = `${now.format('DD/MM/YYYY HH:mm:ss')}`;
                                    let newAnswer = {
                                        date: data,
                                        text: mess,
                                        status: "received",
                                        mod: false,
                                    };
                                    this.IAsendingmessages.position++;
                                    if(this.IAsendingmessages.position == 4)
                                    {
                                        this.IAsendingmessages.position = 0;
                                    }
                                    this.contacts[this.active].state = "online";
                                    Obj.push(newAnswer);
                                    setTimeout(event => {
                                        this.contacts[this.active].state = "";
                                        this.receving = false;
                                    }, 3000)
    
                                }, 2000);
                                
                            }, 2000)
                            this.receving = true;
                        }
                    }
                    this.message = '';
                },
            lastDate:
                function(index, type)
                {
                    let now = dayjs();
                    const hours = `${now.format('HH:mm')}`;
                    const day = `${now.format('DD/MM/YYYY')}`;

                    if(type == "contact")
                    {
                        const leng = this.contacts[index].messages.length - 1;
                        let Obj = this.contacts[index].messages[leng].date;
                        let ObjDay = Obj.split(' ');
                        if(ObjDay[0] != day)
                        {
                            return ObjDay[0];
                        }
                        else
                        {
                            let hour = ObjDay[1].split(':')
                            return `${hour[0]}:${hour[1]}`;
                        }
                    }
                    else    if(type == "message")
                            {
                                let Obj = this.contacts[this.active].messages[index].date;
                                let ObjDay = Obj.split(' ');
                                if(ObjDay[0] != day)
                                {
                                    return ObjDay[0];
                                }
                                else
                                {
                                    let hour = ObjDay[1].split(':')
                                    return `${hour[0]}:${hour[1]}`;
                                }
                            }
                },
            deleteMesssage:
                function(index)
                {
                    this.contacts[this.active].messages.splice(index, 1);
                },
            deleteAllMess:
                function()
                {
                    this.contacts[this.active].messages = [];
                },
            deleteChat:
                function()
                {
                    this.contacts.splice(this.active, 1);
                    this.active = null;
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
                    if(this.receving == false)
                    {
                        let now = dayjs().add(3000, 'millisecond');
                        const hours = `${now.format('HH:mm')}`;
                        const day = `${now.format('DD/MM/YYYY')}`;

                        let Obj = this.contacts[this.active];
                        let max = Obj.messages.length;

                        let Objdate = Obj.messages[max - 1].date.split(' ');
                        if(Objdate[0] != day)
                        {
                            Obj.lastAccess = ` il ${this.ObjDay[0]}`;
                        }
                        else
                        {
                            Obj.lastAccess = ` oggi alle ${hours}`;
                        }
                        
                    }
                },
            message:
                function()
                {
                    if(this.message != '')
                    {
                        this.mic = false;
                    }
                    else
                    {
                        this.mic = true;
                    }
                },
            zoom:
                function() 
                {
                    let CssVar = document.documentElement.style;
                    if(this.zoom == false)
                    {
                        CssVar.setProperty('--var-font-text', '1em');
                        CssVar.setProperty('--var-font-date', '0.7em');
                    }
                    else
                    {
                        CssVar.setProperty('--var-font-text', '1.7em');
                        CssVar.setProperty('--var-font-date', '1em');
                    }
                },
            dark:
                function() 
                {
                    let CssVar = document.documentElement.style;
                    if(this.dark == true)
                    {
                        CssVar.setProperty('--bg-contactlist', '#131c21');
                        CssVar.setProperty('--bg-contactlist-hover', '#323739');
                        CssVar.setProperty('--bg-nav', '#2a2f32');
                        CssVar.setProperty('--bg-icon-date', '#a7a7a7');
                        CssVar.setProperty('--bg-text', 'white');
                        CssVar.setProperty('--bg-input-in', '#323739');
                        CssVar.setProperty('--bg-input-ex', '#1e2428');
                        CssVar.setProperty('--bg-message-sent', '#056162');
                        CssVar.setProperty('--bg-message-rece', '#262d31');

                        
                        CssVar.setProperty('--bg-chevron-sent', 'linear-gradient(90deg, rgba(5, 97, 98,0) 0%, rgba(5, 97, 98,0.8029586834733894) 25%, rgba(5, 97, 98,1) 100%)');
                        CssVar.setProperty('--bg-chevron-rece', 'linear-gradient(90deg, rgba(38, 45, 49,0) 0%, rgba(38, 45, 49,0.8029586834733894) 25%, rgba(38, 45, 49,1) 100%)');

                        CssVar.setProperty('--bg-body', 'linear-gradient(rgba(9, 14, 17, 1) 0vh, rgba(9, 14, 17, 1) 20vh, rgba(9, 14, 17, 1) 20vh, rgba(9, 14, 17, 1) 100vh)');
                    }
                    else
                    {
                        CssVar.setProperty('--bg-contactlist', 'white');
                        CssVar.setProperty('--bg-contactlist-hover', '#E9EBEB');
                        CssVar.setProperty('--bg-nav', '#EAEAEA');
                        CssVar.setProperty('--bg-icon-date', '#B1B1B1');
                        CssVar.setProperty('--bg-text', 'black');
                        CssVar.setProperty('--bg-input-in', 'white');
                        CssVar.setProperty('--bg-input-ex', '#f3eeea');
                        CssVar.setProperty('--bg-message-sent', '#D5F9BA');
                        CssVar.setProperty('--bg-message-rece', 'white');

                        CssVar.setProperty('--bg-chevron-sent', 'linear-gradient(90deg, rgba(213,249,186,0) 0%, rgba(213,249,186,0.8029586834733894) 25%, rgba(213,249,186,1) 100%)');
                        CssVar.setProperty('--bg-chevron-rece', 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8029586834733894) 25%, rgba(255,255,255,1) 100%)');

                        CssVar.setProperty('--bg-body', 'linear-gradient(rgba(0, 149, 135, 100) 0vh, rgba(0, 149, 135, 100) 20vh, rgba(220, 219, 208, 100) 20vh, rgba(220, 219, 208, 100) 100vh)');
                    }
                },
        },
        created()
        {
            setTimeout(event => {
                this.load = false;
                document.querySelector("body").classList.remove("loading");
            }, 1000)
        }
    }
)
  