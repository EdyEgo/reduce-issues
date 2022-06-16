import GroupedIssuesList from './gruppingIssues'

interface IssuesListViewModeListProps {
    filterMyIssue?:boolean,
    filterActiveIssues?:boolean,
    filterBackLogIssues?:boolean
}
 
const IssuesListViewModeList: React.FC<IssuesListViewModeListProps> = ({filterMyIssue,filterActiveIssues,filterBackLogIssues}) => {
 // first the issues pass through the plus filters then through the view filters
 // soo if an issues has an selected element that matches any element within filtersListOrder he shall pass
 // then is ordered buy view and some lements are not showned by selecting and diselecting the display properties


//    const customFilters = useSelector()
//    const viewFilters = useSelector((state:any)=>state.filtersIssues.viewFilters)


    return (  
        <div className="issues-list-view-mode-list">
             <GroupedIssuesList filterMyIssue={filterMyIssue} 
              filterActiveIssues={filterActiveIssues} filterBackLogIssues={filterBackLogIssues}/>
        </div>
    );
}
 
export default IssuesListViewModeList;