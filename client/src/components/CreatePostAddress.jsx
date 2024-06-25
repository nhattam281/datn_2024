import React, { memo, useEffect, useState } from 'react';
import { apiProvince, apiProvinceDistrict } from '../services/province';
import Select from './Select';

function CreatePostAddress({ payload, setPayload }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [district, setDistrict] = useState(payload?.districtId);
    const [province, setProvince] = useState(payload?.provinceId);
    const [ward, setWard] = useState(payload?.wardId);

    const [houseNumber, setHouseNumber] = useState(payload?.address);
    const [reset, setReset] = useState(false);

    const handleChange = (e) => {
        setHouseNumber(e.target.value);
    };

    useEffect(() => {
        const fetchProvince = async () => {
            const res = await apiProvince();
            setProvinces(res);
            // console.log('render');
        };
        fetchProvince();
    }, []);

    useEffect(() => {
        const fetchDistrict = async (provID) => {
            const res = await apiProvinceDistrict(provID, 'DISTRICT');
            setDistricts(res);
        };
        province && fetchDistrict(province);
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([]);
    }, [province]);

    useEffect(() => {
        const fetchWard = async (distID) => {
            const res = await apiProvinceDistrict(distID, 'WARD');
            setWards(res);
        };
        district && fetchWard(district);
        !district ? setReset(true) : setReset(false);
        !district && setWards([]);
    }, [district]);

    useEffect(() => {
        setPayload((prev) => ({
            ...prev,
            provinceId: province,
            districtId: district,
            wardId: ward,
            address: houseNumber,
        }));
    }, [province, district, ward, houseNumber]);

    // console.log({ province, district, ward });
    return (
        <div className='w-full mb-12'>
            <h2 className='text-2xl font-semibold mb-4'>Địa chỉ cho thuê</h2>
            <div className='flex gap-4'>
                <Select
                    value={province}
                    setValue={setProvince}
                    label={'Tỉnh / Thành phố'}
                    options={provinces}
                />
                <Select
                    reset={reset}
                    value={district}
                    setValue={setDistrict}
                    label={'Quận / Huyện'}
                    options={districts}
                />
                <Select
                    reset={reset}
                    value={ward}
                    setValue={setWard}
                    label={'Phuờng / Xã'}
                    options={wards}
                />
            </div>
            <div className='w-1/2 flex flex-col gap-2 mb-4'>
                <label htmlFor='houseNumber' className='font-medium'>
                    Số nhà
                </label>
                <input
                    type='number'
                    className='p-2 border border-solid focus:outline-none'
                    onChange={handleChange}
                    value={houseNumber}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='exactAddress' className='font-medium'>
                    Địa chỉ chính xác
                </label>
                <input
                    type='text'
                    id='exactAddress'
                    disabled
                    className='p-2 border border-solid border-[#ced4da] bg-[#e9ecef] rounded'
                    value={`${houseNumber ? `${houseNumber},` : ''} ${
                        ward
                            ? `${wards?.find((item) => item.id == ward)?.name},`
                            : ''
                    } ${
                        district
                            ? `${
                                  districts?.find((item) => item.id == district)
                                      ?.name
                              },`
                            : ''
                    } ${
                        province
                            ? provinces?.find((item) => item.id == province)
                                  ?.name
                            : ''
                    }`}
                />
            </div>
        </div>
    );
}

export default memo(CreatePostAddress);
