/* eslint-disable camelcase */
export default interface DealDto {
  id: number;
  person_id: {
    active_flag: boolean;
    name: string;
    email: [
      {
        value: string;
        primary: boolean;
      },
    ];
    phone: [
      {
        value: string;
        primary: boolean;
      },
    ];
    value: number;
  };
  org_id: {
    name: string;
    people_count: number;
    owner_id: number;
    address: string;
    active_flag: boolean;
    cc_email: string;
    value: number;
  };
  stage_id: number;
  title: string;
  value: number;
  currency: string;
  add_time: string;
  update_time: string;
  stage_change_time: string;
  active: boolean;
  deleted: boolean;
  status: string;
  person_name: string;
  close_time: string;
  pipeline_id: number;
  won_time: string;
  products_count: number;
  formatted_value: string;
  weighted_value: number;
  formatted_weighted_value: string;
  weighted_value_currency: string;
}
