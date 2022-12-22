import Topic from './Topics'
import AgendaItem from './AgendaItem'
import Venue from './Venue'
import Speaker from './Speaker'

export default function Content({pageContent}){
    const page = pageContent.linkedItems.map(item => {
        switch (item.system.type){
            case 'topic':
                return <Topic topic={item} key={item.system.id} />
            case 'venue':
                return <Venue venue={item} key={item.system.id}/>
            case 'agenda_item':
                return <AgendaItem item={item} key={item.system.id}/>
            case 'speaker':
                return <Speaker speaker={item} key={item.system.id} />
        }
    })

    return(
        <div className="w-7/12">
            {page}
        </div>     
    )
}