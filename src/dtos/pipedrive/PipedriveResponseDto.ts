/* eslint-disable camelcase */
export default interface PipedriveResponseDto<T> {
  success: boolean;
  data: T[];
  additional_data?: {
    pagination: {
      start: number;
      limit: number;
      more_items_in_collection: boolean;
      next_start?: number;
    };
  };
}
