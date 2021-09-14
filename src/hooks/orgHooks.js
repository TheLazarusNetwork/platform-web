
import { useSelector } from "react-redux";

export function useGetOrgs(){
    
    const { numberofOrgs, currentOrgID, orgArray, orgloading } = useSelector(
        (state) => ({
          orgloading: state.organisations.loading,
          numberofOrgs: state.organisations.numberOfOrgs,
          orgArray: [...state.organisations.orgArray],
          currentOrgID: state.organisations.CurrentOrgID,
        })
      );

      return [numberofOrgs,currentOrgID,orgArray,orgloading]
}

